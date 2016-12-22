//Production MySql Database
var connectionSettingsProd = {
    connectLimit: 25,
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
};

//Development MySql Database
var connectionSettingsDev = {
    connectLimit: 25,
    host: '',
    database: '',
    user: '',
    password: ''
};

modules.export(connectionSettingsDev, connectionSettingsProd)