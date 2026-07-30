declare module 'sharp' {
  interface SharpMetadata {
    format?: string;
    width?: number;
    height?: number;
  }

  interface SharpInstance {
    metadata(): Promise<SharpMetadata>;
  }

  export default function sharp(
    input: Buffer,
    options?: { animated?: boolean },
  ): SharpInstance;
}
