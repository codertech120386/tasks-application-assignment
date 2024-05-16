import React from 'react';
import { Flex, Box } from '@mantine/core';
import { IconCaretUpFilled, IconCaretDownFilled } from '@tabler/icons-react';

type TaskTableColumnSortProps = {
  columnHeader: string;
  columnName: string;
  sortTaskByColumnAndDirection: (field: string, direction: string) => void;
};

export const ColumnSorter = ({
  columnHeader,
  columnName,
  sortTaskByColumnAndDirection,
}: TaskTableColumnSortProps) => {
  const sortTaskBy = (field: string, direction: string) => {
    sortTaskByColumnAndDirection(field, direction);
  };

  return (
    <Flex align={'center'}>
      {columnHeader}
      <Box ml='sm'>
        <IconCaretUpFilled
          color='white'
          size={24}
          onClick={() => sortTaskBy(columnName, 'asc')}
        />
        <IconCaretDownFilled
          color='white'
          size={24}
          onClick={() => sortTaskBy(columnName, 'desc')}
        />
      </Box>
    </Flex>
  );
};
