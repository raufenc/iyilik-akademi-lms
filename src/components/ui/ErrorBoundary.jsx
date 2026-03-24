import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    console.error('[ErrorBoundary] Yakalanan hata:', error)
    console.error('[ErrorBoundary] Bilgi:', errorInfo)
  }

  handleRefresh = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0F2F5] to-[#E8ECEF] p-4">
          <div className="max-w-md w-full text-center">
            {/* CSS Art Illustration */}
            <div className="relative mx-auto mb-8 w-40 h-40">
              {/* Outer circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6C5CE7]/10 to-[#A29BFE]/10 animate-pulse" />
              {/* Inner circle */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#6C5CE7]/15 to-[#A29BFE]/15" />
              {/* Face */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Eyes */}
                  <div className="flex gap-6 mb-2 justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#6C5CE7]" />
                    <div className="w-4 h-4 rounded-full bg-[#6C5CE7]" />
                  </div>
                  {/* Sad mouth */}
                  <div className="w-10 h-5 border-b-[3px] border-[#6C5CE7] rounded-b-full mx-auto mt-1 rotate-180" />
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#FDCB6E]/60" />
              <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-[#00B894]/40" />
              <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-[#E17055]/50" />
            </div>

            {/* Error Message */}
            <div className="bg-white dark:bg-[#1A1A2E] rounded-3xl shadow-lg border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] p-8">
              <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Bir seyler ters gitti
              </h1>
              <p className="text-[#A0AEC0] text-sm mb-6 leading-relaxed">
                Sayfada beklenmedik bir hata olustu. Endiselenme, bu durumu duzeltmek icin calisiyoruz.
              </p>

              {/* Error details (collapsed) */}
              {this.state.error && (
                <details className="text-left mb-6 bg-[#F0F2F5] rounded-xl p-3">
                  <summary className="text-xs text-[#A0AEC0] cursor-pointer hover:text-[#4A5568] transition-colors">
                    Teknik detaylar
                  </summary>
                  <pre className="text-xs text-[#E17055] mt-2 whitespace-pre-wrap break-words overflow-auto max-h-32">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleRefresh}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#6C5CE7] to-[#5541D6] shadow-lg shadow-[#6C5CE7]/25 hover:shadow-xl hover:shadow-[#6C5CE7]/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Sayfayi Yenile
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 border-[#6C5CE7]/30 text-[#6C5CE7] hover:bg-[#6C5CE7]/5 hover:border-[#6C5CE7]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Ana Sayfaya Don
                </button>
              </div>
            </div>

            {/* Footer text */}
            <p className="text-xs text-[#A0AEC0] mt-6">
              Iyilik Akademi
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
