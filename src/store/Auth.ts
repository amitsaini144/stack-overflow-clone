import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { account } from '@/models/client/config'
import { AppwriteException, ID, Models } from 'appwrite'

export interface UserPrefs {
    reputation: number
}

interface AuthStore {
    session: Models.Session | null
    jwt: string | null
    user: Models.User<UserPrefs> | null
    hydrated: boolean
    setHydrated(): void
    verifySession(): Promise<void>
    createAccount(name: string, email: string, password: string):
        Promise<{
            success: boolean;
            error?: AppwriteException | null;
        }>
    login(email: string, password: string):
        Promise<{
            success: boolean;
            error?: AppwriteException | null;
        }>

    logout(): Promise<void>
}

export const useAccountStore = create<AuthStore>()(
    persist(
        immer((set) => ({
            session: null,
            jwt: null,
            user: null,
            hydrated: false,

            setHydrated: () => {
                set({ hydrated: true })
            },

            verifySession: async () => {
                try {
                    const session = await account.getSession("current")
                    set({ session })
                } catch (error) {
                    console.log(error)
                }
            },

            createAccount: async (name: string, email: string, password: string) => {
                try {
                    await account.create(ID.unique(), email, password, name)

                    return { success: true }
                } catch (error) {
                    return { success: false, error: error instanceof AppwriteException ? error : null }
                }
            },

            login: async (email: string, password: string) => {
                try {
                    const session = await account.createEmailPasswordSession(email, password)

                    const [user, { jwt }] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT()
                    ])

                    if (!user.prefs?.reputation) await account.updatePrefs({ reputation: 0 })

                    set({ user, session, jwt })

                    return { success: true }
                } catch (error) {
                    return { success: false, error: error instanceof AppwriteException ? error : null }
                }
            },

            logout: async () => {
                try {
                    await account.deleteSessions()
                    set({ session: null, jwt: null, user: null })
                } catch (error) {
                    console.log(error)
                }

            }
        })),
        {
            name: 'auth',
            onRehydrateStorage() {
                return (state, error) => {
                    if (!error) state?.setHydrated();
                }
            }
        }
    )
)
