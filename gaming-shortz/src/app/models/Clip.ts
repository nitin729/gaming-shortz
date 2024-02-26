export interface Clip {
  userId: string | undefined;
  clipId: string | undefined;
  screenshotId: string | undefined;
  screenshotUrl: URL | null | undefined | string;
  title: string | undefined;
  timestamp: string;
  userName: string | undefined;
}
