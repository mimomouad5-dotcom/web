type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const isDev = process.env.NODE_ENV === 'development';

function formatLog(level: LogLevel, message: string, data?: any): string {
  const timestamp = new Date().toISOString();
  const levelUpper = level.toUpperCase().padEnd(7);
  const msg = data ? `${message} ${JSON.stringify(data)}` : message;
  return `[${timestamp}] ${levelUpper} ${msg}`;
}

export const logger = {
  debug: (message: string, data?: any) => {
    if (isDev) console.log(formatLog('debug', message, data));
  },
  info: (message: string, data?: any) => {
    console.log(formatLog('info', message, data));
  },
  warn: (message: string, data?: any) => {
    console.warn(formatLog('warn', message, data));
  },
  error: (message: string, error?: any) => {
    console.error(formatLog('error', message, error));
  },
};
