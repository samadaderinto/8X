import { create } from 'zustand';
import { Submission } from '../types';

interface SubmissionStore {
  submissions: Submission[];
  addSubmission: (submission: Submission) => void;
  updateSubmissionStatus: (id: string, status: Submission['status']) => void;
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  submissions: [],

  addSubmission: (submission) =>
    set((state) => ({
      submissions: [...state.submissions, submission],
    })),

  updateSubmissionStatus: (id, status) =>
    set((state) => ({
      submissions: state.submissions.map((s) =>
        s.id === id ? { ...s, status } : s
      ),
    })),
}));
