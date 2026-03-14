import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { SynonymCards } from './synonym-cards';

const meta = {
  title: 'UI/SynonymCards',
  component: SynonymCards,
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
    synonyms: { control: 'object' },
  },
} satisfies Meta<typeof SynonymCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    synonyms: ['alternative', 'replacement', 'substitute', 'option'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Alternatives')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /copy synonym: alternative/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /copy synonym: replacement/i })).toBeInTheDocument();
    await expect(canvas.getByText('alternative')).toBeInTheDocument();
    await expect(canvas.getByText('replacement')).toBeInTheDocument();
  },
};

export const TwoSynonyms: Story = {
  args: {
    synonyms: ['brief', 'concise'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /copy synonym: brief/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /copy synonym: concise/i })).toBeInTheDocument();
  },
};

export const ManySynonyms: Story = {
  args: {
    synonyms: ['one', 'two', 'three', 'four', 'five', 'six'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Alternatives')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /copy synonym: one/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /copy synonym: six/i })).toBeInTheDocument();
  },
};
