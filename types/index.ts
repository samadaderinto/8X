export interface ExampleVideo {
  id: string;
  thumbnail: string;
  caption: string;
}

export interface Campaign {
  id: string;
  brandName: string;
  brandLogo: string;
  payoutPerVideo: number;
  deadline: string;
  brief: string;
  tags: string[];
  exampleVideos: ExampleVideo[];
}

export interface Submission {
  id: string;
  campaignId: string;
  videoUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}
