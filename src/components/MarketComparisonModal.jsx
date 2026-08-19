import { Check, CircleAlert, Loader2, Store, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function formatCurrency(value) {
  return `R$ ${Number(value || 0).toFixed(2).replace(".", ",")}`;
}

export default function MarketComparisonModal({
  isOpen,
  comparison,
  loading,
  error,
  selectedMarkets,
  onToggleMarket,
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;

  const totals = comparison?.marketTotals || [];
  const availableMarkets = comparison?.availableMarkets || [];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
      <Card className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[2rem] border-none bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 md:px-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
              Comparativo de mercado
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              Onde comprar sua lista?
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Selecione os mercados que deseja considerar no comparativo.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Fechar comparativo"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <CardContent className="max-h-[calc(90vh-92px)] space-y-6 overflow-y-auto p-6 md:p-8">
          {loading && (
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-blue-50 p-6 text-sm font-bold text-blue-700">
              <Loader2 className="animate-spin" size={20} />
              Consultando os preços mais recentes do catálogo...
            </div>
          )}

          {error && !loading && (
            <div className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
              <CircleAlert className="mt-0.5 shrink-0" size={18} />
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && comparison && (
            <>
              {availableMarkets.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                      Mercados encontrados
                    </h3>
                    <span className="text-xs font-bold text-slate-400">
                      {selectedMarkets.length} selecionado(s)
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {availableMarkets.map((market) => {
                      const selected = selectedMarkets.includes(market.source);
                      return (
                        <button
                          key={market.source}
                          type="button"
                          onClick={() => onToggleMarket(market.source)}
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                            selected
                              ? "border-blue-500 bg-blue-50 text-blue-900"
                              : "border-slate-200 bg-white text-slate-500 hover:border-blue-200"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Store size={18} />
                            <span className="font-bold">{market.market}</span>
                          </span>
                          <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${selected ? "bg-blue-600 text-white" : "bg-slate-100 text-transparent"}`}>
                            <Check size={15} strokeWidth={3} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  Total estimado por mercado
                </h3>
                {totals.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-6 text-center text-sm font-semibold text-slate-500">
                    Nenhum preço correspondente foi encontrado para os produtos da lista.
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {totals.map((market, index) => (
                      <div
                        key={market.source}
                        className={`rounded-2xl border p-4 ${index === 0 ? "border-emerald-300 bg-emerald-50/70" : "border-slate-200 bg-white"}`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`rounded-xl p-2 ${index === 0 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                              <Store size={18} />
                            </div>
                            <div>
                              <p className="font-black text-slate-900">{market.market}</p>
                              <p className="text-xs font-semibold text-slate-500">
                                {market.matchedItems} de {market.matchedItems + market.missingItems} itens encontrados
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-black text-slate-900">{formatCurrency(market.total)}</p>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${market.complete ? "text-emerald-700" : "text-amber-700"}`}>
                              {market.complete ? "Lista completa" : `${market.missingItems} sem preço`}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
                          <div
                            className={`h-full rounded-full ${market.complete ? "bg-emerald-500" : "bg-amber-400"}`}
                            style={{ width: `${market.coverage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-12 rounded-xl font-black text-slate-500"
            >
              Fechar
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              disabled={loading || !comparison || availableMarkets.length === 0}
              className="h-12 rounded-xl bg-blue-600 px-6 font-black text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Consultando..." : "Atualizar comparação"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
