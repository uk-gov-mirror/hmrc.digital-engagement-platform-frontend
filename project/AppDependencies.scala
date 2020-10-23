import play.core.PlayVersion.current
import play.sbt.PlayImport._
import sbt.Keys.libraryDependencies
import sbt._

object AppDependencies {

  val compile: Seq[ModuleID] = Seq(
    "uk.gov.hmrc" %% "govuk-template" % "5.47.0-play-26",
    "uk.gov.hmrc" %% "play-ui" % "8.5.0-play-26",
    "uk.gov.hmrc" %% "bootstrap-play-26" % "1.16.0",
    "uk.gov.hmrc" %% "play-whitelist-filter" % "3.1.0-play-26",
    "uk.gov.hmrc" %% "url-builder" % "3.4.0-play-26",
    "uk.gov.hmrc" %% "digital-engagement-platform-chat" % "0.3.0-play-26-SNAPSHOT"
  )

  val test: Seq[ModuleID] = Seq(
    "uk.gov.hmrc" %% "bootstrap-play-26" % "1.3.0" % Test classifier "tests",
    "org.scalatest" %% "scalatest" % "3.0.8" % "test",
    "org.scalacheck" %% "scalacheck" % "1.13.4" % "test",
    "org.jsoup" % "jsoup" % "1.10.2" % "test",
    "org.mockito" % "mockito-all" % "1.10.19" % "test",
    "com.typesafe.play" %% "play-test" % current % "test",
    "org.pegdown" % "pegdown" % "1.6.0" % "test",
    "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % "test"
  )

  val all: Seq[ModuleID] = compile ++ test

}
