import {ResponsePost} from '@/api';
import {create} from 'zustand';

interface DetailPostState {
  detailPost: ResponsePost | null;
  setDetailPost: (detailPost: ResponsePost) => void;
}

// feed 상세 정보를 담아서 보관
const useDetailStore = create<DetailPostState>(set => ({
  detailPost: null,
  setDetailPost: (detailPost: ResponsePost) => {
    set({detailPost});
  },
}));

export default useDetailStore;
