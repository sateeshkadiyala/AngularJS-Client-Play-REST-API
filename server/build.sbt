import PlayKeys._

name := "playangular"

version := "1.0"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean, SbtWeb)



scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs,
  filters,
  "ws.securesocial" %% "securesocial" % "3.0-M4",
  "org.postgresql"    %  "postgresql"        % "9.4-1201-jdbc41"
)


// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator
