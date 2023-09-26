import type { Meta, StoryObj } from "@storybook/react";
import { SketchPad } from ".";

const meta = {
  title: "SketchPad",
  component: SketchPad,
  tags: ["autodocs"],
} satisfies Meta<typeof SketchPad>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    scale: [1, 1],
    controls: {
      clear: true,
      exportJson: true,
      exportToPng: true,
      undo: true,
    },
    size: 400,
    styles: {
      backgroundColor: "white",
    },
  },
};
