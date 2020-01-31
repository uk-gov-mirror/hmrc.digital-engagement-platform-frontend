import scoverage.ScoverageKeys
import uk.gov.hmrc.DefaultBuildSettings._
import uk.gov.hmrc.SbtArtifactory
import uk.gov.hmrc.sbtdistributables.SbtDistributablesPlugin.publishingSettings

val appName = "digital-engagement-platform-frontend"

lazy val scoverageSettings = {
  Seq(
    ScoverageKeys.coverageExcludedPackages :="""uk\.gov\.hmrc\.BuildInfo;.*\.Routes;.*\.RoutesPrefix;.*config\.ErrorHandler;.*views\.html\.ErrorTemplate;.*\.Reverse[^.]*""",
    ScoverageKeys.coverageMinimum := 80,
    ScoverageKeys.coverageFailOnMinimum := false,
    ScoverageKeys.coverageHighlighting := true
  )
}

lazy val microservice = Project(appName, file("."))
  .enablePlugins(play.sbt.PlayScala, SbtAutoBuildPlugin, SbtGitVersioning, SbtDistributablesPlugin, SbtArtifactory, ScoverageSbtPlugin)
  .configs(IntegrationTest)
  .settings(integrationTestSettings(): _*)
  .settings(
    majorVersion                     := 0,
    libraryDependencies ++= AppDependencies.all,
    publishingSettings,
    defaultSettings(),
    scalaVersion := "2.12.8",
    PlayKeys.playDefaultPort := 9956,
    TwirlKeys.templateImports ++= Seq(
      "play.twirl.api.HtmlFormat",
      "play.twirl.api.HtmlFormat._",
      "uk.gov.hmrc.play.views.html.helpers._",
      "uk.gov.hmrc.play.views.html.layouts._"
    ),
    scoverageSettings,
    resolvers += Resolver.jcenterRepo
  )
