export type TGlobalStat = {
  profile: {
    user: null | {
      name: string;
      email: string;
      password: string;
    };
    isLoading: boolean;
    token: string | null;
  };
};
