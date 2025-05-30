import { Badge, Button, Cell, EntryCell, Icon, WorkflowIcon } from '@mastra/playground-ui';
import { Footprints } from 'lucide-react';

type ColumnDef<T> = {
  id: string;
  header: string;
  cell: (props: { row: { original: T } }) => React.ReactNode;
  meta?: {
    width?: string;
  };
  size?: number;
};

export const workflowsTableColumns: ColumnDef<{ id: string; name: string; stepsCount: number; isVNext?: boolean }>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => <EntryCell icon={<WorkflowIcon />} name={row.original.name} />,
    meta: {
      width: 'auto',
    },
  },
  {
    id: 'action',
    header: 'Action',
    size: 300,
    cell: ({ row }) => (
      <Cell>
        <div className="flex justify-end items-center gap-2">
          <Badge icon={<Footprints />} className="!h-button-md">
            {row.original.stepsCount} step{row.original.stepsCount > 1 ? 's' : ''}
          </Badge>

          <Button as="a" href={`/workflows${row.original.isVNext ? '/v-next' : ''}/${row.original.id}/graph`}>
            <Icon>
              <WorkflowIcon />
            </Icon>
            View Workflow
          </Button>

          {row.original.isVNext ? <Badge className="!text-accent1 !h-button-md">vNext</Badge> : null}
        </div>
      </Cell>
    ),
  },
];
