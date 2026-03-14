import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { CardTextResponse } from './card-text-response';

const meta = {
  title: 'UI/CardTextResponse',
  component: CardTextResponse,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'aria-label', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
  },
} satisfies Meta<typeof CardTextResponse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'This is the rephrased result that the user can copy.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Rephrased Result')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Copy rephrased result' })).toBeInTheDocument();
    await expect(canvas.getByText('This is the rephrased result that the user can copy.')).toBeInTheDocument();
  },
};

export const LongText: Story = {
  args: {
    text: 'First paragraph of the result.\n\nSecond paragraph with more content that wraps onto multiple lines to test layout and readability.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Copy rephrased result' })).toBeInTheDocument();
    await expect(canvas.getByText(/First paragraph of the result/)).toBeInTheDocument();
  },
};
