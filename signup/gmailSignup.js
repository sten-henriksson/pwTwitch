


async function entertwitchcreds(page, credobj) {
    //https://www.google.com/gmail/about/
    //html body header.header div.header__container div.header__aside div.header__aside__buttons a.button.button--mobile-after-hero-only span.laptop-desktop-only
    //name1 html.CMgTXc body#yDmH0d.EIlDfe div.H2SoFe.LZgQXe.RELBvb.TFhTPc div#initialView.RAYh1e.RELBvb.LZgQXe.qmmlRd div.xkfVF div.Aa1VU div#view_container.JhUD8d.SQNfcc.vLGJgb div.zWl5kd div.DRS7Fe.bxPAYd.k6Zj8d div.pwWryf.bxPAYd div.Wxwduf.Us7fWe.JhUD8d div.WEQkZc div.bCAAsb form span section.aTzEhb div.CxRgyd div div.SdBahf.DbQnIe.ia6RDd div.eEgeR div.hDp5Db div.rFrNMe.ze9ebf.OcVpRe.zKHdkd.sdJrJc div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input#firstName.whsOnd.zHQkBf
    //name2 html.CMgTXc body#yDmH0d.EIlDfe div.H2SoFe.LZgQXe.RELBvb.TFhTPc div#initialView.RAYh1e.RELBvb.LZgQXe.qmmlRd div.xkfVF div.Aa1VU div#view_container.JhUD8d.SQNfcc.vLGJgb div.zWl5kd div.DRS7Fe.bxPAYd.k6Zj8d div.pwWryf.bxPAYd div.Wxwduf.Us7fWe.JhUD8d div.WEQkZc div.bCAAsb form span section.aTzEhb div.CxRgyd div div.SdBahf.DbQnIe.ia6RDd div.eEgeR div.hDp5Db div.rFrNMe.ze9ebf.OcVpRe.zKHdkd.sdJrJc div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input#lastName.whsOnd.zHQkBf
    //username html.CMgTXc body#yDmH0d.EIlDfe div.H2SoFe.LZgQXe.RELBvb.TFhTPc div#initialView.RAYh1e.RELBvb.LZgQXe.qmmlRd div.xkfVF div.Aa1VU div#view_container.JhUD8d.SQNfcc.vLGJgb div.zWl5kd div.DRS7Fe.bxPAYd.k6Zj8d div.pwWryf.bxPAYd div.Wxwduf.Us7fWe.JhUD8d div.WEQkZc div.bCAAsb form span section.aTzEhb div.CxRgyd div div.akwVEf.OcVpRe div.d2CFce.cDSmF.OcVpRe div.rFrNMe.N3Hzgf.jjwyfe.ACpCs.pXgSje.q0K82e.zKHdkd.sdJrJc.Tyc9J div.aCsJod.oJeWuf div.aXBtI.I0VJ4d.Wic03c div.Xb9hP input#username.whsOnd.zHQkBf
    //pass html.CMgTXc body#yDmH0d.EIlDfe div.H2SoFe.LZgQXe.RELBvb.TFhTPc div#initialView.RAYh1e.RELBvb.LZgQXe.qmmlRd div.xkfVF div.Aa1VU div#view_container.JhUD8d.SQNfcc.vLGJgb div.zWl5kd div.DRS7Fe.bxPAYd.k6Zj8d div.pwWryf.bxPAYd div.Wxwduf.Us7fWe.JhUD8d div.WEQkZc div.bCAAsb form span section.aTzEhb div.CxRgyd div div.SdBahf.Fjk18.OcVpRe.DbQnIe.ia6RDd div.eEgeR div.DPChp div.Txuhic div.hDp5Db div#passwd.rFrNMe.ze9ebf.YKooDc.OcVpRe.wIXLub.zKHdkd.sdJrJc div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf
    //pass2 html.CMgTXc body#yDmH0d.EIlDfe div.H2SoFe.LZgQXe.RELBvb.TFhTPc div#initialView.RAYh1e.RELBvb.LZgQXe.qmmlRd div.xkfVF div.Aa1VU div#view_container.JhUD8d.SQNfcc.vLGJgb div.zWl5kd div.DRS7Fe.bxPAYd.k6Zj8d div.pwWryf.bxPAYd div.Wxwduf.Us7fWe.JhUD8d div.WEQkZc div.bCAAsb form span section.aTzEhb div.CxRgyd div div.SdBahf.Fjk18.OcVpRe.DbQnIe.ia6RDd div.eEgeR div.DPChp div.Txuhic div.hDp5Db div#confirm-passwd.rFrNMe.ze9ebf.YKooDc.OcVpRe.wIXLub.zKHdkd.sdJrJc div.aCsJod.oJeWuf div.aXBtI.Wic03c div.Xb9hP input.whsOnd.zHQkBf
    
    
    await page.bringToFront()
    await delay(1000)
    await page.click('[data-a-target="consent-banner-accept"]')
    await delay(500)
}