

const userTaskShowGroup = [
  {
    id: "general",
    entries: [
      {
        id: "name",
        validate: {
          required: true,
          validate: (element, values) => {
            if (!values.name || values.name.trim() === '') {
              return { name: '名称不能为空' };
            }
          }
        }
      },
      { id: "id" },
    ]
  },
  {
    id: "multiInstance",
    entries: [
      { id: "completionCondition" },
      { id: "collection" },
      { id: "elementVariable" },
    ]
  },
  {
    id: "CamundaPlatform__UserAssignment",
    entries: [
      { id: "assignee" },
      { id: "candidateUsers" },
    ]
  },

]


export {
  userTaskShowGroup
}