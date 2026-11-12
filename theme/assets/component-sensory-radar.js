/**
 * Miley Theme - <sensory-radar> Custom Element
 * Pure-SVG Radar Chart for Specialty Coffee Cupping Profiles
 * 0 framework dependencies, 100% mathematical vector geometry
 */

class SensoryRadar extends HTMLElement {
  constructor() {
    super();
    this.productId = this.getAttribute('data-product-id');
    this.axes = [
      { key: 'acidity', label: 'Acidity' },
      { key: 'sweetness', label: 'Sweetness' },
      { key: 'body', label: 'Body' },
      { key: 'cleanCup', label: 'Clean Cup' },
      { key: 'finish', label: 'Finish' },
    ];
  }

  connectedCallback() {
    const dataIsland = window.ThemeEvents?.getProductData(this.productId);
    const cupping = dataIsland?.telemetry?.cupping;

    // Defensive collapse (Agent Rule 6): If cupping profile is null/missing, collapse cleanly
    if (!cupping) {
      this.style.display = 'none';
      return;
    }

    this.renderChart(cupping);
  }

  renderChart(cuppingData) {
    const size = 300;
    const cx = size / 2;
    const cy = size / 2;
    const maxRadius = 100;
    const totalAxes = this.axes.length;
    const angleStep = (2 * Math.PI) / totalAxes;
    const startAngle = -Math.PI / 2;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.setAttribute('class', 'sensory-radar__svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Sensory Cupping Profile Radar Chart');

    // 1. Draw concentric grid polygons (levels 2, 4, 6, 8, 10)
    const gridLevels = [2, 4, 6, 8, 10];
    gridLevels.forEach((level) => {
      const r = (level / 10) * maxRadius;
      const pts = [];
      for (let i = 0; i < totalAxes; i++) {
        const angle = startAngle + i * angleStep;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', pts.join(' '));
      polygon.setAttribute('class', 'radar-grid-line');
      svg.appendChild(polygon);
    });

    // 2. Draw axis lines and labels
    this.axes.forEach((axis, i) => {
      const angle = startAngle + i * angleStep;
      const xEnd = cx + maxRadius * Math.cos(angle);
      const yEnd = cy + maxRadius * Math.sin(angle);

      // Axis line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx);
      line.setAttribute('y1', cy);
      line.setAttribute('x2', xEnd.toFixed(1));
      line.setAttribute('y2', yEnd.toFixed(1));
      line.setAttribute('class', 'radar-axis-line');
      svg.appendChild(line);

      // Axis label
      const labelRadius = maxRadius + 20;
      const xLabel = cx + labelRadius * Math.cos(angle);
      const yLabel = cy + labelRadius * Math.sin(angle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', xLabel.toFixed(1));
      text.setAttribute('y', yLabel.toFixed(1));
      text.setAttribute('class', 'radar-label');
      text.textContent = axis.label;
      svg.appendChild(text);
    });

    // 3. Draw data polygon
    const dataPoints = [];
    const pointsList = [];

    this.axes.forEach((axis, i) => {
      const val = Math.min(10, Math.max(0, Number(cuppingData[axis.key]) || 7.5));
      const r = (val / 10) * maxRadius;
      const angle = startAngle + i * angleStep;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      dataPoints.push({ x, y, val });
      pointsList.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    });

    const dataPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    dataPolygon.setAttribute('points', pointsList.join(' '));
    dataPolygon.setAttribute('class', 'radar-polygon');
    svg.appendChild(dataPolygon);

    // 4. Draw data point circles
    dataPoints.forEach((pt) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pt.x.toFixed(1));
      circle.setAttribute('cy', pt.y.toFixed(1));
      circle.setAttribute('r', '4');
      circle.setAttribute('class', 'radar-data-point');
      svg.appendChild(circle);
    });

    const container = this.querySelector('.sensory-radar__svg-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(svg);
    }
  }
}

if (!customElements.get('sensory-radar')) {
  customElements.define('sensory-radar', SensoryRadar);
}
