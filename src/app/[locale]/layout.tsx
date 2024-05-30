import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import React from "react"

const LocaleLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) => {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
