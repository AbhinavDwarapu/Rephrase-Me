import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Label } from './label';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Email address' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Email address')).toBeInTheDocument();
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="email">{args.children}</Label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="rounded-md border border-input px-3 py-2 text-sm"
      />
    </div>
  ),
  args: { children: 'Email' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Email');
    await expect(label).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  },
};
