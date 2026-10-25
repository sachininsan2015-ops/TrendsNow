type SparklineProps = {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
  className?: string;
};

export function Sparkline({
  data,
  width = 120,
  height = 36,
  color = 'rgb(var(--primary))',
  fill = true,
  className = '',
}: SparklineProps) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const stepX = width / (data.length - 1 || 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y];
  });
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const areaPath = `${path} L${width},${height} L0,${height} Z`;
  const gradId = `spark-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
    >
      {fill && (
        <>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradId})`} />
        </>
      )}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LineChartProps = {
  series: { name: string; data: number[]; color: string }[];
  height?: number;
  labels?: string[];
};

export function LineChart({ series, height = 280, labels }: LineChartProps) {
  const width = 760;
  const padding = { top: 20, right: 16, bottom: 28, left: 36 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const allData = series.flatMap((s) => s.data);
  const max = Math.max(...allData, 100);
  const min = 0;
  const range = max - min || 1;
  const len = Math.max(...series.map((s) => s.data.length), 2);
  const stepX = chartW / (len - 1 || 1);

  const yTicks = [0, 25, 50, 75, 100].filter((v) => v <= max);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      {yTicks.map((tick) => {
        const y = padding.top + chartH - ((tick - min) / range) * chartH;
        return (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="rgb(var(--border))"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={padding.left - 8}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="rgb(var(--text-muted))"
            >
              {tick}
            </text>
          </g>
        );
      })}
      {labels &&
        labels.map((label, i) => {
          if (i % Math.ceil(len / 6) !== 0 && i !== len - 1) return null;
          const x = padding.left + i * stepX;
          return (
            <text
              key={i}
              x={x}
              y={height - 8}
              textAnchor="middle"
              fontSize="10"
              fill="rgb(var(--text-muted))"
            >
              {label}
            </text>
          );
        })}
      {series.map((s) => {
        const points = s.data.map((v, i) => {
          const x = padding.left + i * stepX;
          const y = padding.top + chartH - ((v - min) / range) * chartH;
          return [x, y];
        });
        const path = points
          .map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`)
          .join(' ');
        return (
          <g key={s.name}>
            <path
              d={path}
              fill="none"
              stroke={s.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p[0]}
                cy={p[1]}
                r="3"
                fill={s.color}
                opacity={i === points.length - 1 ? 1 : 0.5}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

type BarChartProps = {
  data: { label: string; value: number; color?: string }[];
  height?: number;
};

export function BarChart({ data, height = 200 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2" style={{ minHeight: height }}>
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <div className="w-20 text-xs text-muted truncate" title={d.label}>
            {d.label}
          </div>
          <div className="flex-1 bg-base rounded-full h-5 overflow-hidden border border-app">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: d.color || 'rgb(var(--primary))',
              }}
            />
          </div>
          <div className="w-10 text-xs text-right text-muted tabular-nums">
            {d.value}
          </div>
        </div>
      ))}
    </div>
  );
}
