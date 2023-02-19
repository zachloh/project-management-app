import { Box, Stack, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { ChartEvent } from 'chart.js';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Ticket } from 'tabler-icons-react';

import { Project } from 'types';
import { getIssueTypes } from 'utils/getIssueTypes';

type IssueTypesPieChartProps = {
  project: Project;
};

function IssueTypesPieChart({ project }: IssueTypesPieChartProps) {
  const { ref, width } = useElementSize();

  const { tasks, stories, bugs } = getIssueTypes(project);

  if (tasks === 0 && stories === 0 && bugs === 0) {
    return (
      <Stack mih={320} align="center" justify="center" spacing={10} pb={40}>
        <Ticket color="#5C5F66" size={24} />
        <Text align="center" weight={600} color="dark.3" px={20}>
          This project has no issues
        </Text>
      </Stack>
    );
  }

  const data = {
    labels: ['Tasks', 'Stories', 'Bugs'],
    datasets: [
      {
        data: [tasks, stories, bugs],
        backgroundColor: ['#D0BFFF', '#9775FA', '#7048E8'],
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
        position: width > 330 ? ('right' as const) : ('top' as const),
        labels: {
          font: {
            weight: '700',
            size: 16,
          },
          boxWidth: 18,
          boxHeight: 18,
          padding: width > 330 ? 15 : 10,
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
    <Box mih={320} w="80%" maw={450} mx="auto" ref={ref}>
      {width > 0 && (
        <Pie
          data={data}
          options={options}
          plugins={[ChartDataLabels]}
          aria-label="Pie chart displaying issues categorized by their types"
        />
      )}
    </Box>
  );
}

export default IssueTypesPieChart;
