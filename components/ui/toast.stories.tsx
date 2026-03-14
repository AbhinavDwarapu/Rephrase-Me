import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Toast } from './toast';

const meta = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [{ id: 'region', enabled: true }],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    show: { control: 'boolean' },
    message: { control: 'text' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hidden: Story = {
  args: { show: false, message: 'Copied!' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('status')).not.toBeInTheDocument();
  },
};

export const Visible: Story = {
  args: { show: true, message: 'Copied to clipboard!' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole('status');
    await expect(status).toBeInTheDocument();
    await expect(canvas.getByText('Copied to clipboard!')).toBeInTheDocument();
  },
};

export const ShortMessage: Story = {
  args: { show: true, message: 'Done' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('status')).toBeInTheDocument();
    await expect(canvas.getByText('Done')).toBeInTheDocument();
  },
};
