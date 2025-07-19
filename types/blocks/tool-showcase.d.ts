import { Image, Button } from "@/types/blocks/base";

export interface ToolVideo {
  src: string;
  poster?: string;
  alt?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export interface ToolFeature {
  icon?: string;
  title: string;
  description: string;
}

export interface ToolShowcaseItem {
  title: string;
  description: string;
  features?: ToolFeature[];
  video?: ToolVideo;
  image?: Image;
  buttons?: Button[];
  badge?: string;
  reverse?: boolean; // 是否反转布局（视频在左，描述在右）
}

export interface ToolShowcase {
  disabled?: boolean;
  name?: string;
  title?: string;
  description?: string;
  label?: string;
  items?: ToolShowcaseItem[];
}
