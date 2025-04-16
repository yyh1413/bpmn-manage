
export default `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_0witljt</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="Activity_0r4bxhd" name="我" camunda:assignee="Fireball">
      <bpmn:incoming>Flow_0witljt</bpmn:incoming>
      <bpmn:multiInstanceLoopCharacteristics isSequential="true" camunda:collection="3" camunda:elementVariable="4">
        <bpmn:completionCondition xsi:type="bpmn:tFormalExpression">2</bpmn:completionCondition>
      </bpmn:multiInstanceLoopCharacteristics>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_0witljt" sourceRef="StartEvent_1" targetRef="Activity_0r4bxhd" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0r4bxhd_di" bpmnElement="Activity_0r4bxhd">
        <dc:Bounds x="260" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0witljt_di" bpmnElement="Flow_0witljt">
        <di:waypoint x="209" y="120" />
        <di:waypoint x="260" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>

`