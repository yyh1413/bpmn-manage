import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

// import {
//   append as svgAppend,
//   attr as svgAttr,
//   create as svgCreate,
//   select as svgSelect,
//   selectAll as svgSelectAll,
//   clone as svgClone,
//   clear as svgClear,
//   remove as svgRemove,
// } from "tiny-svg";
const HIGH_PRIORITY = 1500;

class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer, modeling) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
    this.modeling = modeling;
  }
  canRender(element) {
    // ignore labels
    return !element.labelTarget;
  }
  /**
   * 自定义连接线的样式
   * @param {*} parentNode 当前元素的svgNode
   * @param {*} element
   * @returns
   */
  drawConnection(parentNode, element) {
    const line = this.bpmnRenderer.drawConnection(parentNode, element);
    // 给节点添加class以更改样式
    let className = this.highLightedActivitiesIds.includes(element.id)
      ? "djs-visual Activities"
      : this.runningActivitiesIds.includes(element.id)
        ? "djs-visual running"
        : "djs-visual unActivities";

    return line;
  }
  /**
   * 自定义节点图形
   * @param {*} parentNode 当前元素的svgNode
   * @param {*} element
   * @returns
   */
  drawShape(parentNode, element) {
    console.log('parentNode, element', parentNode, element);

    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    const { type, width, height, x, y } = element;

    // 根据不同节点添加相应图片
    if (type == "bpmn:UserTask" && !!element.businessObject.name) {
      console.log('parentNode, element', parentNode, element);

      // 创建 SVG 圆圈
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

      // 设置圆圈的属性
      const circleRadius = 10; // 圆圈的半径
      const circleX = 0; // 圆圈在用户任务节点的右下角
      const circleY = 0; // 圆圈在用户任务节点的右下角

      circle.setAttribute("cx", circleX);
      circle.setAttribute("cy", circleY);
      circle.setAttribute("r", circleRadius);
      circle.setAttribute("fill", "red");

      // 将圆圈添加到父节点
      parentNode.appendChild(circle);
    }

    return shape;
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }
}

CustomRenderer.$inject = ["eventBus", "bpmnRenderer"];


export default {
  __init__: ['customRenderer'],
  customRenderer: ['type', CustomRenderer]
};