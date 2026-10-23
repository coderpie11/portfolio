$ErrorActionPreference = "SilentlyContinue"
function G($u){
  try { $r = Invoke-WebRequest -Uri $u -TimeoutSec 20 -UseBasicParsing
    return @{ code = $r.StatusCode; body = $r.Content } }
  catch { $c = 0; if ($_.Exception.Response) { $c = [int]$_.Exception.Response.StatusCode.value__ }
    return @{ code = $c; body = "" } }
}
$routes = @("/","/about","/experience","/projects","/skills","/certifications","/blog","/contact","/projects/adaptive-rag","/projects/funnx-ai","/projects/does-not-exist","/totally-fake")
foreach ($p in $routes) {
  $res = G ("http://localhost:3001" + $p)
  $want = 200; if ($p -match "does-not-exist|totally-fake") { $want = 404 }
  $tag = if ($res.code -eq $want) { "PASS" } else { "FAIL" }
  Write-Output ("{0} GET {1} => {2} (want {3})" -f $tag, $p, $res.code, $want)
}
$hp = (G "http://localhost:3001/").body
$ab = (G "http://localhost:3001/about").body
$sk = (G "http://localhost:3001/skills").body
Write-Output ("{0} home: Vol.01 absent" -f $(if ($hp -notmatch "Vol\. 01") {"PASS"} else {"FAIL"}))
Write-Output ("{0} home: grain-overlay absent" -f $(if ($hp -notmatch "grain-overlay") {"PASS"} else {"FAIL"}))
Write-Output ("{0} home: 'Powered by Groq' absent" -f $(if ($hp -notmatch "Powered by Groq") {"PASS"} else {"FAIL"}))
Write-Output ("{0} home: intro-overlay present" -f $(if ($hp -match "intro-overlay") {"PASS"} else {"FAIL"}))
Write-Output ("{0} about: verbatim 'never fall over' present" -f $(if ($ab -match "never fall over") {"PASS"} else {"FAIL"}))
Write-Output ("{0} skills: FinTech present" -f $(if ($sk -match "FinTech") {"PASS"} else {"FAIL"}))
