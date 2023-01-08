import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';

import ProjectHistory, { History } from 'models/projectHistory';

type ProjectHistoryAggregate = {
  _id: Types.ObjectId;
  count: number;
  results: (Omit<History, 'user'> & { user: string })[];
};

const getProjectHistory = async (req: Request, res: Response) => {
  const RESULTS_PER_PAGE = 5;
  const { page } = req.query;
  const { projectId } = req.params;

  if (!page || typeof page !== 'string') {
    return res.status(400).json({ message: 'Missing page number' });
  }

  const pageNum = Number(page);
  if (!pageNum || pageNum <= 0) {
    return res.status(400).json({ message: 'Invalid page number' });
  }

  try {
    const projectHistory =
      await ProjectHistory.aggregate<ProjectHistoryAggregate>([
        {
          $match: {
            projectId: new mongoose.Types.ObjectId(projectId),
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'history.user',
            foreignField: '_id',
            as: 'users',
          },
        },
        {
          $project: {
            count: {
              $size: '$history',
            },
            results: {
              $map: {
                input: {
                  $slice: [
                    '$history',
                    (pageNum - 1) * RESULTS_PER_PAGE,
                    RESULTS_PER_PAGE,
                  ],
                },
                in: {
                  $mergeObjects: [
                    '$$this',
                    {
                      user: {
                        $let: {
                          vars: {
                            matchedUser: {
                              $arrayElemAt: [
                                '$users',
                                {
                                  $indexOfArray: ['$users._id', '$$this.user'],
                                },
                              ],
                            },
                          },
                          in: {
                            $concat: [
                              '$$matchedUser.firstName',
                              ' ',
                              '$$matchedUser.lastName',
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ]);

    if (projectHistory.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json({
      nextPage:
        pageNum * RESULTS_PER_PAGE >= projectHistory[0].count
          ? undefined
          : pageNum + 1,
      data: projectHistory[0].results,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default {
  getProjectHistory,
};
