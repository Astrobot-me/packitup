import { Role } from '@/lib/auth';
import 'next-auth';

declare module 'next-auth'{
   interface  Session  {
        user: {
            _id?: string;
            isVerified?: boolean;
            username?: string;
            userrole : Role
          } & DefaultSession['user'];
    }

    interface User {
        _id?: string;
        isVerified?: boolean;
        username?: string;
        userrole : Role
    }


}

declare module 'next-auth/jwt' {
    interface JWT {
      _id?: string;
      isVerified?: boolean;
      username?: string;
      userrole : Role
    }
  }