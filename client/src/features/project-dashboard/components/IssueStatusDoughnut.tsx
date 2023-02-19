import { Box, Stack, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { Chart, ChartEvent, Plugin } from 'chart.js';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Ticket } from 'tabler-icons-react';

import { Project } from 'types';

type IssueStatusDoughnutProps = {
  project: Project;
};

const textCenter: Plugin<'doughnut'> = {
  id: 'textCenter',
  beforeDatasetsDraw(chart: Chart<'doughnut'>) {
    const { ctx, data } = chart;
    const xCoord = chart.getDatasetMeta(0).data[0].x;
    const yCoord = chart.getDatasetMeta(0).data[0].y;

    const sum = data.datasets[0].data.reduce((a, b) => a + b, 0);

    ctx.save();
    ctx.font = '700 30px sans-serif';
    ctx.fillStyle = '#25262B';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${sum}`, xCoord, yCoord - 12);

    ctx.font = '700 16px sans-serif';
    ctx.fillStyle = '#25262B';
    ctx.fillText(sum > 1 ? 'Issues' : 'Issue', xCoord, yCoord + 18);
  },
};

function IssueStatusDoughnut({ project }: IssueStatusDoughnutProps) {
  const { ref, width } = useElementSize();

  const totalIssues =
    project.todoIssues.length +
    project.inProgressIssues.length +
    project.inReviewIssues.length +
    project.completedIssues.length;

  if (totalIssues === 0) {
    return (
      <Stack mih={320} align="center" justify="center" spacing={10} pb={40}>
        <Ticket color="#5C5F66" size={24} />
        <Text align="center" weight={600} color="dark.3" px={20}>
          This project has no issues
        </Text>
      </Stack>
    );
  }

  const doughnutData = {
    labels: ['TO DO', 'IN PROGRESS', 'IN REVIEW', 'DONE'],
    datasets: [
      {
        data: [
          project.todoIssues.length,
          project.inProgressIssues.length,
          project.inReviewIssues.length,
          project.completedIssues.length,
        ],
        backgroundColor: ['#D0BFFF', '#9775FA', '#7048E8', '#5F3DC4'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      tooltip: {
        caretPadding: 15,
        padding: 8,
        boxPadding: 5,
      },
      legend: {
        position: width > 365 ? ('right' as const) : ('top' as const),
        labels: {
          font: {
            weight: '700',
            size: 14,
          },
          usePointStyle: true,
          boxHeight: 14,
          padding: width > 365 ? 15 : 10,
        },
        onHover: (event: ChartEvent) => {
          const element = event.native?.target as HTMLElement;
          element.style.cursor = 'pointer';
        },
        onLeave: (event: ChartEvent) => {
          const element = event.native?.target as HTMLElement;
          element.style.cursor = 'default';
        },
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 20,
          weight: 700,
        },
        display(context: Context) {
          const value = context.dataset.data[context.dataIndex];
          if (value && value >= 1) return true;
          return false;
        },
      },
    },
  };

  return (
    <Box mih={320} w="85%" maw={500} mx="auto" ref={ref}>
      {width > 0 && (
        <Doughnut
          data={doughnutData}
          options={options}
          plugins={[textCenter, ChartDataLabels]}
          aria-label="Doughnut chart displaying issues categorized by their status"
        />
      )}
    </Box>
  );
}

export default IssueStatusDoughnut;
