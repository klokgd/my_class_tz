interface DbConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    dialect: 'postgres';
}

interface AppConfig {
    port: number;
    env: 'development' | 'production';
}

export interface Config {
    db: DbConfig;
    app: AppConfig;
    prefix: string;
    port: number;
}
