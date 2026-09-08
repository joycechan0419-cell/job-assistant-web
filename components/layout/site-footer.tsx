import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="mt-10 pt-6 border-t-2 border-pixel-line text-center">
        <p className="text-[10px] text-pixel-mute uppercase tracking-widest font-mono">
          设计师求职文书 AI 助手 · MVP Demo · 规则引擎模拟 · 不接入真实 LLM
        </p>
        <button
          onClick={() => setShowPrivacy(true)}
          className="mt-3 inline-flex items-center gap-1 text-[11px] text-pixel-yellow hover:underline uppercase tracking-widest font-bold"
        >
          <Shield className="w-3 h-3" />
          数据隐私声明
        </button>
      </footer>

      {showPrivacy && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowPrivacy(false)}
        >
          <div
            className="bg-pixel-card border-2 border-pixel-yellow rounded-none max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-4 border-b-2 border-pixel-line pb-3">
              <Shield className="w-4 h-4 text-pixel-yellow" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-pixel-yellow">
                数据隐私声明
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-pixel-text leading-relaxed">
              <li>· 用户上传的简历、作品集、JD 含敏感个人信息</li>
              <li>· 本 Demo 仅在浏览器本地处理，不发送到任何服务器</li>
              <li>· 关闭页面即&ldquo;即焚&rdquo;，新会话完全独立</li>
              <li>· 不将任何材料用于模型训练</li>
              <li>· 可随时点击页面底部&ldquo;重置&rdquo;清空所有数据</li>
            </ul>
            <Button
              onClick={() => setShowPrivacy(false)}
              variant="default"
              className="w-full mt-5"
            >
              我知道了
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
