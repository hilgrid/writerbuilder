import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { DIMENSIONS } from './constants';
import { HoverContext } from './types';

interface SteeringWheelProps {
  onHover: (context: HoverContext | null) => void;
  onClick: (context: HoverContext) => void;
  width?: number;
  height?: number;
}

export const SteeringWheel: React.FC<SteeringWheelProps> = ({ onHover, onClick, width = 600, height = 600 }) => {
  const radius = Math.min(width, height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  const innerRadius = radius * 0.18;
  const ring1Radius = radius * 0.38;
  const ring2Radius = radius * 0.55;
  const ring3Radius = radius * 0.95;

  const arcGenerator = d3.arc<any>()
    .innerRadius((d) => d.innerRadius)
    .outerRadius((d) => d.outerRadius)
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)
    .padAngle(0.01)
    .padRadius(radius);

  const getTextTransform = (startAngle: number, endAngle: number, r: number) => {
    const angle = (startAngle + endAngle) / 2;
    const x = Math.sin(angle) * r;
    const y = -Math.cos(angle) * r;

    let rotate = (angle * 180) / Math.PI;

    if (rotate > 90 && rotate < 270) {
      rotate += 180;
    }

    return `translate(${x}, ${y}) rotate(${rotate})`;
  };

  const getRadialTextTransform = (startAngle: number, endAngle: number, r: number) => {
    const angle = (startAngle + endAngle) / 2;
    const x = Math.sin(angle) * r;
    const y = -Math.cos(angle) * r;

    let degrees = (angle * 180) / Math.PI;
    let rotate = degrees - 90;

    if (degrees > 180) {
        rotate += 180;
    }

    return `translate(${x}, ${y}) rotate(${rotate})`;
  };

  const renderWheel = useMemo(() => {
    const paths: React.ReactElement[] = [];
    const labels: React.ReactElement[] = [];

    const anglePerDim = (2 * Math.PI) / 6;

    DIMENSIONS.forEach((dim, i) => {
      const dimStartAngle = i * anglePerDim;
      const dimEndAngle = (i + 1) * anglePerDim;

      const ring1Arc = {
        innerRadius: innerRadius,
        outerRadius: ring1Radius,
        startAngle: dimStartAngle,
        endAngle: dimEndAngle,
      };

      const dimSubItems = dim.branches.map(b => ({
        name: b.name,
        description: b.description
      }));

      const dimHover: HoverContext = {
        title: dim.name,
        subtitle: 'Dimension',
        description: dim.description,
        subItems: dimSubItems,
        color: dim.color,
        type: 'dimension'
      };

      paths.push(
        <path
          key={`dim-${dim.id}`}
          d={arcGenerator(ring1Arc) || ''}
          fill={dim.hexColor}
          className="transition-opacity duration-300 hover:opacity-80 cursor-pointer"
          onMouseEnter={() => onHover(dimHover)}
          onMouseLeave={() => onHover(null)}
          onClick={(e) => {
            e.stopPropagation();
            onClick(dimHover);
          }}
          opacity={0.9}
        />
      );

      labels.push(
        <text
          key={`label-dim-${dim.id}`}
          transform={getTextTransform(dimStartAngle, dimEndAngle, (innerRadius + ring1Radius) / 2)}
          textAnchor="middle"
          dy="0.35em"
          className="fill-stone-800 font-bold text-sm md:text-lg pointer-events-none uppercase"
          style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}
        >
          {dim.name}
        </text>
      );

      dim.branches.forEach((branch, bIndex) => {
        let branchStartAngle, branchEndAngle;

        if (dim.isBidirectional) {
            const anglePerBranch = anglePerDim / 2;
            branchStartAngle = dimStartAngle + (bIndex * anglePerBranch);
            branchEndAngle = branchStartAngle + anglePerBranch;
        } else {
            branchStartAngle = dimStartAngle;
            branchEndAngle = dimEndAngle;
        }

        const ring2Arc = {
            innerRadius: ring1Radius,
            outerRadius: ring2Radius,
            startAngle: branchStartAngle,
            endAngle: branchEndAngle
        };

        const branchSubItems = branch.groups.map(g => ({
            name: g.name,
            description: g.description || ''
        }));

        const branchHover: HoverContext = {
            title: branch.name,
            subtitle: dim.name,
            description: branch.description,
            subItems: branchSubItems,
            color: dim.color,
            type: 'branch'
        };

        paths.push(
            <path
                key={`branch-${branch.id}`}
                d={arcGenerator(ring2Arc) || ''}
                fill={dim.hexColor}
                opacity={0.7}
                className="transition-all duration-300 hover:opacity-100 cursor-pointer stroke-stone-300 stroke-1"
                onMouseEnter={() => onHover(branchHover)}
                onMouseLeave={() => onHover(null)}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(branchHover);
                }}
            />
        );

        labels.push(
            <text
                key={`label-branch-${branch.id}`}
                transform={getTextTransform(branchStartAngle, branchEndAngle, (ring1Radius + ring2Radius) / 2)}
                textAnchor="middle"
                dy="0.35em"
                className="fill-stone-800 font-semibold text-xs md:text-sm pointer-events-none"
                style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}
            >
                {branch.name}
            </text>
        );

        const groupCount = branch.groups.length;
        const anglePerGroup = (branchEndAngle - branchStartAngle) / groupCount;

        branch.groups.forEach((group, gIndex) => {
            const groupStartAngle = branchStartAngle + (gIndex * anglePerGroup);
            const groupEndAngle = groupStartAngle + anglePerGroup;

            const ring3Arc = {
                innerRadius: ring2Radius,
                outerRadius: ring3Radius,
                startAngle: groupStartAngle,
                endAngle: groupEndAngle
            };

            const groupHover: HoverContext = {
                title: group.name,
                subtitle: 'Make your output more...',
                description: group.description || `Use these descriptors for ${branch.name.toLowerCase()} ${dim.name.toLowerCase()}.`,
                details: group.adjectives,
                color: dim.color,
                type: 'group'
            };

            paths.push(
                <path
                    key={`group-${group.id}`}
                    d={arcGenerator(ring3Arc) || ''}
                    fill={dim.hexColor}
                    opacity={0.5}
                    className="transition-all duration-300 hover:opacity-100 cursor-pointer stroke-stone-200 stroke-[0.5]"
                    onMouseEnter={() => onHover(groupHover)}
                    onMouseLeave={() => onHover(null)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(groupHover);
                    }}
                />
            );

            labels.push(
                <text
                    key={`label-group-${group.id}`}
                    transform={getRadialTextTransform(groupStartAngle, groupEndAngle, (ring2Radius + ring3Radius) / 2)}
                    textAnchor="middle"
                    dy="0.35em"
                    className="fill-stone-800 font-medium pointer-events-none"
                    style={{
                        textShadow: '0 1px 2px rgba(255,255,255,0.3)',
                        fontSize: width < 600 ? '12px' : '15px'
                    }}
                >
                    {group.name}
                </text>
            );
        });

      });
    });

    return { paths, labels };
  }, [onHover, onClick, arcGenerator, innerRadius, ring1Radius, ring2Radius, ring3Radius, width]);

  return (
    <div className="relative flex items-center justify-center p-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="max-w-full max-h-screen">
        <g transform={`translate(${centerX}, ${centerY})`}>
          {renderWheel.paths}
          {renderWheel.labels}

          {/* Center Hub - warm cream color */}
          <circle r={innerRadius * 0.9} fill="#fce8c3" className="stroke-stone-400 stroke-2" />
        </g>
      </svg>
    </div>
  );
};
