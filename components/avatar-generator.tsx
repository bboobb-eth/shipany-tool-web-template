import React from 'react';

interface AvatarGeneratorProps {
  name?: string;
  size?: number;
  className?: string;
}

// 预定义的颜色组合
const colorCombinations = [
  { bg: '#FF6B6B', text: '#FFFFFF' }, // 红色
  { bg: '#4ECDC4', text: '#FFFFFF' }, // 青色
  { bg: '#45B7D1', text: '#FFFFFF' }, // 蓝色
  { bg: '#96CEB4', text: '#FFFFFF' }, // 绿色
  { bg: '#FFEAA7', text: '#2D3436' }, // 黄色
  { bg: '#DDA0DD', text: '#FFFFFF' }, // 紫色
  { bg: '#98D8C8', text: '#2D3436' }, // 薄荷绿
  { bg: '#F7DC6F', text: '#2D3436' }, // 金黄色
  { bg: '#BB8FCE', text: '#FFFFFF' }, // 淡紫色
  { bg: '#85C1E9', text: '#FFFFFF' }, // 天蓝色
];

// 根据字符串生成一致的随机数
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash);
}

// 获取名字的首字母
function getInitials(name: string): string {
  if (!name) return '?';
  
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

export default function AvatarGenerator({ 
  name = 'Anonymous', 
  size = 40, 
  className = '' 
}: AvatarGeneratorProps) {
  // 根据名字生成一致的颜色
  const colorIndex = hashCode(name) % colorCombinations.length;
  const colors = colorCombinations[colorIndex];
  
  const initials = getInitials(name);
  
  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full font-semibold ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: colors.bg,
        color: colors.text,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}

// SVG 头像组件（更丰富的设计）
export function SVGAvatar({ 
  name = 'Anonymous', 
  size = 40, 
  className = '' 
}: AvatarGeneratorProps) {
  const colorIndex = hashCode(name) % colorCombinations.length;
  const colors = colorCombinations[colorIndex];
  const initials = getInitials(name);
  
  // 根据名字生成不同的图案
  const patternIndex = hashCode(name + 'pattern') % 4;
  
  const renderPattern = () => {
    switch (patternIndex) {
      case 0:
        // 圆点图案
        return (
          <>
            <circle cx="15" cy="15" r="2" fill={colors.text} opacity="0.2" />
            <circle cx="25" cy="15" r="2" fill={colors.text} opacity="0.2" />
            <circle cx="20" cy="25" r="2" fill={colors.text} opacity="0.2" />
          </>
        );
      case 1:
        // 线条图案
        return (
          <>
            <line x1="10" y1="10" x2="30" y2="10" stroke={colors.text} strokeWidth="1" opacity="0.2" />
            <line x1="10" y1="30" x2="30" y2="30" stroke={colors.text} strokeWidth="1" opacity="0.2" />
          </>
        );
      case 2:
        // 三角形图案
        return (
          <polygon 
            points="20,8 28,24 12,24" 
            fill={colors.text} 
            opacity="0.2" 
          />
        );
      default:
        // 菱形图案
        return (
          <polygon 
            points="20,10 30,20 20,30 10,20" 
            fill={colors.text} 
            opacity="0.2" 
          />
        );
    }
  };
  
  return (
    <div className={`inline-block ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        {/* 背景圆形 */}
        <circle cx="20" cy="20" r="20" fill={colors.bg} />
        
        {/* 背景图案 */}
        {renderPattern()}
        
        {/* 首字母 */}
        <text
          x="20"
          y="20"
          textAnchor="middle"
          dominantBaseline="central"
          fill={colors.text}
          fontSize={size * 0.4}
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
