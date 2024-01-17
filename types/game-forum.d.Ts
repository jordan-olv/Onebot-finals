declare module 'game' {
  export const id: (text: string) => string;
  export const name: (text: string) => string;
  export const description: (text: string) => string;
  export const image: (text: string) => string;
  export const color: (text: string) => string;
  export const messageId: (text: string) => string;
  export const roleId: (text: string) => string;
}
