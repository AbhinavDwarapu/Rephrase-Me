import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Textarea } from './textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Type here...' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('Type here...');
    await expect(textarea).toBeInTheDocument();
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Type here...',
    defaultValue: 'Some initial text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toHaveValue('Some initial text');
  },
};

export const Disabled: Story = {
  args: { placeholder: 'Disabled', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox')).toBeDisabled();
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-2">
      <label htmlFor="bio" className="text-sm font-medium">
        Bio
      </label>
      <Textarea id="bio" {...args} />
    </div>
  ),
  args: { placeholder: 'Tell us about yourself' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', { name: /bio/i })).toBeInTheDocument();
  },
};
