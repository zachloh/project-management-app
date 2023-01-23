import { Request, Response } from 'express';

import Organization from 'models/organizations';

const getOrganizationById = async (req: Request, res: Response) => {
  try {
    const organization = await Organization.findOne({
      _id: req.params.orgId,
    }).populate({ path: 'members', select: '-password' });

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    return res.json(organization);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default { getOrganizationById };
