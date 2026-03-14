import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Button' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();
  },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Disabled' });
    await expect(button).toBeDisabled();
  },
};
