import React from 'react';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';

interface ColorPickerInputProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPickerInput({ value, onChange }: ColorPickerInputProps) {
  const handleChange = (color: Color) => {
    if (color) {
      onChange(color.toHexString());
    }
  };

  return (
    <ColorPicker
      value={value || '#000000'}
      onChange={handleChange}
      showText
      styles={{
        popupOverlayInner: { zIndex: 9999 }
      }}
      allowClear
      presets={[]}
    />
  );
} 