export default `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_0zl5kmi</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_0zl5kmi" sourceRef="StartEvent_1" targetRef="Activity_0pp2eyn" />
    <bpmn:sequenceFlow id="Flow_1xno123" sourceRef="Activity_0pp2eyn" targetRef="Event_0qncw2c" />
    <bpmn:intermediateCatchEvent id="Event_0qncw2c">
      <bpmn:incoming>Flow_1xno123</bpmn:incoming>
      <bpmn:messageEventDefinition id="MessageEventDefinition_1xp7b8g" />
    </bpmn:intermediateCatchEvent>
    <bpmn:userTask id="Activity_0pp2eyn" name="1111" camunda:assignee="Fireball">
      <bpmn:incoming>Flow_0zl5kmi</bpmn:incoming>
      <bpmn:outgoing>Flow_1xno123</bpmn:outgoing>
    </bpmn:userTask>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0fyq0cj_di" bpmnElement="Event_0qncw2c">
        <dc:Bounds x="412" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0s9cwrv_di" bpmnElement="Activity_0pp2eyn">
        <dc:Bounds x="260" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0zl5kmi_di" bpmnElement="Flow_0zl5kmi">
        <di:waypoint x="209" y="120" />
        <di:waypoint x="260" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1xno123_di" bpmnElement="Flow_1xno123">
        <di:waypoint x="360" y="120" />
        <di:waypoint x="412" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`
