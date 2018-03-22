// tslint:disable-next-line:max-line-length

export let securityFields = {
  name: 'security',
  [`entities.^[User].fields.[createdBy,updateBy]`]: {
    name: 'createdBy',
    indexed: true,
    relation: {
      belongsTo: 'User#',
    },
  },
  [`entities.^[User].fields.[createdAt,updatedAt]`]: {
    indexed: true,
    type: 'Date',
  },
  [`entities.^[User].fields.removed`]: {
    type: 'Boolean',
    indexed: true,
  },
};

export let securityAcl = {
  name: 'security',
  'entities.^[User].fields.[createdBy,updateBy,createdAt, updatedAt].metadata.acl.read': 'admin',
};

export let ownerFields = {
  name: 'security',
  [`entities.^[User].fields`]: [
    {
      name: 'owner',
      indexed: true,
    },
  ],
};

export let ownerAcl = {
  name: 'security',
  [`entities.^[User].fields.owner.metadata.acl.read`]: 'admin',
};

export let adapter = {
  name: 'mongoose',
  'entities.*.metadata.storage.adapter': 'mongoose',
};

export let defaultVisibility = {
  name: 'default visibility',
  //lock data layer for users
  [`entities.[${dataLayer}].metadata.acl.read`]: 'moderator',
  [`entities.[${dataLayer}].fields.*.metadata.acl.read`]: 'moderator',
};

export const accessFixEntities = {
  name: 'Defatult Mutation access',
  'entities.*.metadata.acl.create': [],
  'entities.*.fields.*.metadata.acl.create': [],
  'entities.*.metadata.acl.read': [],
  'entities.*.fields.*.metadata.acl.read': [],
  'entities.*.metadata.acl.update': [],
  'entities.*.fields.*.metadata.acl.update': [],
  'entities.*.metadata.acl.delete': [],
  'entities.*.fields.*.metadata.acl.delete': [],
};

export const accessFixMutations = {
  name: 'Defatult Mutation access',
  'mutations.*.metadata.acl.execute': [],
};

export let defaultMutationAccess = {
  name: 'Defatult Mutation access',
  'mutations.*.metadata.acl.execute': 'owner',
  'mutations.loginUser.metadata.acl.execute': 'public',
};

export let defaultIdVisibility = {
  name: 'default id field visibility',
  'entities.*.fields.id.metadata.acl.read': 'public',
};

export let runtimeMutationAcl = {
  '*': false,
  system: {
    '*': true,
  },
  admin: {
    '*': true,
  },
  moderator: {
    '*': true,
  },
  users: {
    addBookmark: true,
    addItem: true,
    addOption: true,
    addProductToPlaceholder: true,
    addProject: true,
    addPublicPermissions: true,
    addUserToProject: true,
    combineOptions: true,
    copyItemToProject: true,
    copyItemsToProject: true,
    draftItem: true,
    exportProjectItemsCSV: true,
    leaveProject: true,
    logout: true,
    publishItem: true,
    purchaseItem: true,
    removeBookmark: true,
    removeItem: true,
    removeItemOption: true,
    removeProject: true,
    removeUserFromProject: true,
    restoreItem: true,
    restoreItemOption: true,
    restoreUserOnProject: true,
    selectOption: true,
    setLastActivity: true,
    unselectOption: true,
    updateOption: true,
    updatePassword: true,
    updateProfileInformation: true,
    updateProjectEnv: true,
    updateProjectOwner: true,
    updateUserAvatar: true,
    updateUserEnv: true,
    updateUserIsCanEdit: true,
    updateUserProjectProfileProperties: true,
    updateUserProjectProfileRole: true,

    '^addTo': false,
    '^create': false,
    '^delete': false,
    '^removeFrom': false,
    '^update': false,

    '*': false,
  },
  public: {
    checkLoginEnable: true,
    initUserAccount: true,
    loginUser: true,
    registerUser: true,
    restorePassword: true,
    startRestorePasswordProcess: true,
    '*': false,
  },
};
