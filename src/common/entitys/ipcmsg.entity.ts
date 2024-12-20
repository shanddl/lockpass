export enum webToManMsg {
  SetLang = 'setLang',
  GetLang = 'getLang',
  //user
  Login = 'Login',
  getCurUserInfo = 'getCurUserInfo',
  isLogin = 'isLogin',
  Register = 'Register',
  Logout = 'Logout',
  getAllUser = 'getAllUser',
  GetLastUserInfo = 'getLastUser',
  UpdateUser = 'UpdateUser',

  //valut
  GetAllValuts = 'GetAllValuts',
  UpdateValut = 'UpdateValut',
  DeleteValut = 'DeleteValut',
  AddValut = 'AddValut',

  //vaultItem
  GetAllValutItems = 'GetAllValutItems',
  updateValutItem = 'updateValutItem',
  DeleteValutItem = 'DeleteValutItem',
  AddValutItem = 'AddValutItem',

  //other
  ResizeWindow = 'ResizeWindow',
  GetWinBasePath = 'GetWinBasePath',
  isLock = 'isLock',
  LockApp = 'LockApp',
  UnLockApp = 'UnLockApp',
  IsSystemInit = 'IsSystemInit',
  AutoFill = 'AutoFill',
  ShortCutKeyChange = 'ShortCutKeyChange',
  CheckShortKey = 'CheckShortKey',
  getMousePos = 'getMousePos',
  showWindows = 'showWindows',
  ShowVaultItem = 'ShowItem',
  UpdateTrayMenu = 'UpdateTrayMenu',
  Backup_local = 'BackupFromLocal',
  Recover_local = 'RestoreFromLocal',
  //drive
  BackupByDrive = 'BackupFromDrive',
  RecoverByDrive = 'RestoreFromDrive',
  DeleteByDrive = 'DeleteFromDrive',
  TrashByDrive = 'trashFromDrive',
  GetFilelistByDrive = 'GetAllBackupsFromDrive',
  //app
  QuitAPP = 'QuitAPP',
  ImportCSV = 'ImportCSV',
  ExputCSV = 'ExputCSV',
  RestartApp = 'RestartApp',
  CloseDb = 'CloseDb',
  OpenDb = 'OpenDb',
  getLogLevel = 'getLogLevel',
  ChangeMainPassword = 'ChangeMainPassword',
  getAppVersion = 'getAppVersion',
  checkUpdate = 'checkUpdate',
  CancelUpdate = 'CancelUpdate',
  checkUpdateAuto = 'checkUpdateAuto',
  Downloadupdate = 'Downloadupdate',
  PowerOnOpen = 'PowerOnOpen',
  InstallUpdate = 'InstallUpdate',
  CheckUpdateStatus = 'CheckUpdateStatus',
  IsVaultChangeNotBackup = 'IsVaultChangeNotBackup',
  getAppSet = 'getAppSet',
  OpenShell = 'OpenShell',

  //test
  LoginGoogledrive = 'LoginGoogledrive',
  //admin
  OpenDev = 'OpenDev',
  OpenLog = 'OpenLog'
}

export enum MainToWebMsg {
  ShowMsg = 'ShowMsg',
  ShowMsgMain = 'ShowMsgMain',
  LockApp = 'lockApp',
  LoginOK = 'LoginOk',
  LoginOut = 'LoginOut',
  UserChange = 'userchange',
  VaultChange = 'vaultchange',
  vaultItemChange = 'vaultItemChange',
  DataChange = 'DataChange',
  ShowVaulteItem = 'ShowVaulteItem',
  AliyunAuthOk = 'AliyunAuthOk',
  LangChange = 'LangChange',
  AppUpdateEvent = 'UpdateEvent',
  VaultChangeNotBackup = 'VaultChangeNotBackup',
  WindowsHide = 'windosHide',
  WindowsShow = 'windosShow',
  AppSetChange = 'AppSetChange'
}
