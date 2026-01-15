"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OrderPanel() {
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [amount, setAmount] = useState("0.1")
  const [price, setPrice] = useState("97842.50")

  return (
    <Card className="flex-1 border-border/50 bg-card/30">
      <CardHeader className="border-b border-border/50 p-3">
        <CardTitle className="text-sm font-medium">Place Order</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
            <TabsTrigger value="buy" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive"
            >
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-4 space-y-4">
            <div className="flex gap-2">
              <Button
                variant={orderType === "market" ? "secondary" : "ghost"}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setOrderType("market")}
              >
                Market
              </Button>
              <Button
                variant={orderType === "limit" ? "secondary" : "ghost"}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setOrderType("limit")}
              >
                Limit
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Amount (BTC)</Label>
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-9 bg-secondary/50 font-mono"
              />
            </div>

            {orderType === "limit" && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Price (USD)</Label>
                <Input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-9 bg-secondary/50 font-mono"
                />
              </div>
            )}

            <div className="rounded-lg bg-secondary/30 p-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-mono font-medium">
                  ${(Number.parseFloat(amount) * Number.parseFloat(price.replace(",", ""))).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-mono text-muted-foreground">~$2.50</span>
              </div>
            </div>

            <Button className="h-10 w-full bg-primary text-primary-foreground hover:bg-primary/90">Buy BTC</Button>
          </TabsContent>

          <TabsContent value="sell" className="mt-4 space-y-4">
            <div className="flex gap-2">
              <Button
                variant={orderType === "market" ? "secondary" : "ghost"}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setOrderType("market")}
              >
                Market
              </Button>
              <Button
                variant={orderType === "limit" ? "secondary" : "ghost"}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setOrderType("limit")}
              >
                Limit
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Amount (BTC)</Label>
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-9 bg-secondary/50 font-mono"
              />
            </div>

            {orderType === "limit" && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Price (USD)</Label>
                <Input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-9 bg-secondary/50 font-mono"
                />
              </div>
            )}

            <div className="rounded-lg bg-secondary/30 p-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-mono font-medium">
                  ${(Number.parseFloat(amount) * Number.parseFloat(price.replace(",", ""))).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-mono text-muted-foreground">~$2.50</span>
              </div>
            </div>

            <Button className="h-10 w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sell BTC
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
