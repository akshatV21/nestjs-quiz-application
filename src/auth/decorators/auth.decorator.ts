import { SetMetadata } from '@nestjs/common'
import { AuthOptions } from 'src/utils/types'

export const Auth = (authOptions: AuthOptions) => {
  const metadata = {
    isOpen: authOptions.isOpen ?? false,
    user: authOptions.user ?? true,
    role: authOptions.role ?? 'standard',
  }
  return SetMetadata('authOptions', metadata)
}

Auth({ user: false })
