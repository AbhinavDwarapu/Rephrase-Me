import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within, userEvent } from 'storybook/test';
import { AIInputWithSuggestions } from './ai-input-with-suggestions';

const meta = {
  title: 'UI/AIInputWithSuggestions',
  component: AIInputWithSuggestions,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'label', enabled: true },
          { id: 'aria-label', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof AIInputWithSuggestions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: /input text to rephrase/i });
    await expect(input).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText('Enter your text here...')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /select summary style/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /submit rephrase request/i })).toBeInTheDocument();
  },
};

export const WithCustomPlaceholder: Story = {
  args: { placeholder: 'Paste your text...' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByPlaceholderText('Paste your text...')).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox')).toBeDisabled();
  },
};

export const WithActionSelected: Story = {
  args: { defaultSelected: 'Summary' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /submit rephrase as summary/i })).toBeInTheDocument();
  },
};

export const InteractionSelectAction: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const summaryButton = canvas.getByRole('button', { name: /select summary style/i });
    await userEvent.click(summaryButton);
    await expect(canvas.getByRole('button', { name: /submit rephrase as summary/i })).toBeInTheDocument();
  },
};
