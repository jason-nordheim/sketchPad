import type { Meta, StoryObj } from "@storybook/react";
import { SketchPad } from ".";

const meta = {
  title: "SketchPad",
  component: SketchPad,
  tags: ["autodocs"],
} satisfies Meta<typeof SketchPad>;

type Story = StoryObj<typeof meta>;

export default meta;

export const WhiteSketchPad: Story = {
  args: {
    scale: [1, 1],
    showExportJson: true,
    showExportToPng: true,
    showUndo: true,
    size: 400,
    styles: {
      backgroundColor: "white",
    },
  },
};
