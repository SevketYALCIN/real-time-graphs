import { useQueryClient } from '@tanstack/react-query'
import React, { useRef } from 'react'

export const useReactQuerySubscription = () => {
  const queryClient = useQueryClient()
  let websocket = useRef(null)

  React.useEffect(() => {
    websocket.current = new WebSocket('ws://localhost:3001/')
    websocket.current.onopen = () => {
      console.log('connected')
    }
    websocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const queryKey = data.queries
      queryClient.invalidateQueries({ queryKey })
    }

    return () => {
      websocket.current.close()
    }
  }, [queryClient])

  return websocket.current
}