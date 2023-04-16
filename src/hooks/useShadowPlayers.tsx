// hooks/useShadowPlayers.ts
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { ShadowPlayer } from '@/types/ShadowPlayer'

const useShadowPlayers = () => {
    const [shadowPlayers, setShadowPlayers] = useState<ShadowPlayer[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchShadowPlayers = async () => {
            try {
                setLoading(true)
                const response = await supabase
                    .from('shadow_players')
                    .select('*')

                if (response.error) throw response.error
                if (response.data) setShadowPlayers(response.data as ShadowPlayer[])
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchShadowPlayers()
    }, [])

    return { shadowPlayers, loading, error }
}

export default useShadowPlayers
