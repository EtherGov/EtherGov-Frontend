import { FC, useState } from "react";
import {
  SismoConnectButton,
  SismoConnectResponse,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-react";
import {
  CONFIG,
  AUTHS,
  SIGNATURE_REQUEST,
  AuthType,
  ClaimType,
} from "../../shared/sismo";
import { group } from "console";

interface SismoConnectFunctionProps {
  comethGroupId: string; // New parameter
  comethWallet:string;
  setsismoVerfied: React.Dispatch<React.SetStateAction<string>>;
}

const SismoConnectFunction: FC<SismoConnectFunctionProps> = ({ comethGroupId,comethWallet, setsismoVerfied }) => {
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =
    useState<SismoConnectVerifiedResult>();
  const [sismoConnectResponse, setSismoConnectResponse] =
    useState<SismoConnectResponse>();
  const [pageState, setPageState] = useState<string>("init");
  const [error, setError] = useState<string>("");
  console.log("groupId di sismo function", comethGroupId)
  
  
  const apiString='/api/verify/route?comethGroupId='+ comethGroupId+"&comethWallet="+comethWallet

  console.log("apiString", apiString) 
  console.log("comethWallet", comethWallet) 
  console.log("comethGroupId", comethGroupId)

  return (
    <>
      {/* <main className="main"> */}
      {/* <Header /> */}
      {pageState == "init" ? (
        <>
          <SismoConnectButton
            config={comethWallet!=="null"?
              // CONFIG
              {
                appId: "0x081d495d9a48438002867986b3fdc187",
                vault:{impersonate:["0xbaf502f416aeed726883832b76322001034aad92"]}
              }:
              {appId: "0x081d495d9a48438002867986b3fdc187",}
            }
            auths={AUTHS}
            claims={
              // CLAIMS
              [
                { groupId: comethGroupId ,
                claimType: ClaimType.EQ,
                value: 1,},
              ]
            }
            signature={SIGNATURE_REQUEST}
            text="Prove With Sismo"
            onResponse={async (response: SismoConnectResponse) => {
              setSismoConnectResponse(response);
              setPageState("verifying");
              setsismoVerfied("verifying");
              console.log("groupId", comethGroupId)
              const verifiedResult = await fetch(apiString, {
                method: "POST",
                body: JSON.stringify(response),
              });
              console.log(response);

              const data = await verifiedResult.json();
              console.log("ini verified result",data);

              if (verifiedResult.ok) {
                setSismoConnectVerifiedResult(data);
                setPageState("verified");
                setsismoVerfied("verified");
              } else {
                setPageState("error");
                setsismoVerfied("error");
                setError(data);
              }
            }}
          />
        </>
      ) : (
        <>
          {/* <button
              onClick={() => {
                window.location.href = "/";
              }}
            >
              {" "}
              RESET{" "}
            </button> */}

          <div className="status-wrapper">
            {pageState == "verifying" ? (
              <div className="flex justify-center">
                <h1 className="verifying text-center p-5 border-2 rounded-xl bg-amber-400 text-2xl w-[300px] text-[#fff]">
                  Verifying ZK Proofs...
                </h1>
              </div>
            ) : (
              <>
                {Boolean(error) ? (
                  <div className=" flex justify-center">
                    <h1 className="error text-center p-5 border-2 rounded-xl bg-red-800 text-2xl w-[300px] text-[#fff]">
                      Error verifying ZK Proofs: {JSON.stringify(error)}{" "}
                    </h1>
                  </div>
                ) : (
                  <div className=" flex justify-center">
                    <h1 className="verified text-center p-5 border-2 rounded-xl bg-indigo-800 text-2xl w-[300px] text-[#fff]">
                      ZK Proofs verified!
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

// function tableData(){
//   <>
//           {/* Table of the Sismo Connect requests and verified result */}

//         {/* Table for Verified Auths */}
//         {sismoConnectVerifiedResult && (
//           <>
//             <h3>Verified Auths</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>AuthType</th>
//                   <th>Verified UserId</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sismoConnectVerifiedResult.auths.map((auth, index) => (
//                   <tr key={index}>
//                     <td>{AuthType[auth.authType]}</td>
//                     <td>{auth.userId}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}

//         <br />

//         {/* Table for Verified Claims */}
//         {sismoConnectVerifiedResult && (
//           <>
//             <h3>Verified Claims</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>groupId</th>
//                   <th>ClaimType</th>
//                   <th>Verified Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sismoConnectVerifiedResult.claims.map((claim, index) => (
//                   <tr key={index}>
//                     <td>
//                       <a
//                         target="_blank"
//                         href={"https://factory.sismo.io/groups-explorer?search=" + claim.groupId}
//                       >
//                         {claim.groupId}
//                       </a>
//                     </td>
//                     <td>{ClaimType[claim.claimType!]}</td>
//                     <td>{claim.value}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}

//         {/* Table of the Auths requests*/}
//         <h3>Auths requested</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>AuthType</th>
//               <th>Requested UserId</th>
//               <th>Optional?</th>
//               <th>ZK proof</th>
//             </tr>
//           </thead>
//           <tbody>
//             {AUTHS.map((auth, index) => (
//               <tr key={index}>
//                 <td>{AuthType[auth.authType]}</td>
//                 <td>{readibleHex(auth.userId || "No userId requested")}</td>
//                 <td>{auth.isOptional ? "optional" : "required"}</td>
//                 {sismoConnectResponse ? (
//                   <td>{readibleHex(getProofDataForAuth(sismoConnectResponse, auth.authType)!)}</td>
//                 ) : (
//                   <td> ZK proof not generated yet </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <br />

//         {/* Table of the Claims requests*/}
//         <h3>Claims requested</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>GroupId</th>
//               <th>ClaimType</th>
//               <th>Requested Value</th>
//               <th>Can User Select Value?</th>
//               <th>Optional?</th>
//               <th>ZK proof</th>
//             </tr>
//           </thead>
//           <tbody>
//             {CLAIMS.map((claim, index) => (
//               <tr key={index}>
//                 <td>
//                   <a
//                     target="_blank"
//                     href={"https://factory.sismo.io/groups-explorer?search=" + claim.groupId}
//                   >
//                     {claim.groupId}
//                   </a>
//                 </td>
//                 <td>{ClaimType[claim.claimType || 0]}</td>
//                 <td>{claim.value ? claim.value : "1"}</td>
//                 <td>{claim.isSelectableByUser ? "yes" : "no"}</td>
//                 <td>{claim.isOptional ? "optional" : "required"}</td>
//                 {sismoConnectResponse ? (
//                   <td>
//                     {readibleHex(
//                       getProofDataForClaim(
//                         sismoConnectResponse,
//                         claim.claimType || 0,
//                         claim.groupId!,
//                         claim.value || 1
//                       )!
//                     )}
//                   </td>
//                 ) : (
//                   <td> ZK proof not generated yet </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Table of the Signature request and its result */}
//         <h3>Signature requested and verified</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Message Requested</th>
//               <th>Can User Modify message?</th>
//               <th>Verified Signed Message</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{SIGNATURE_REQUEST.message}</td>
//               <td>{SIGNATURE_REQUEST.isSelectableByUser ? "yes" : "no"}</td>
//               <td>
//                 {sismoConnectVerifiedResult
//                   ? sismoConnectVerifiedResult.signedMessage
//                   : "ZK proof not verified yet"}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       {/* </main> */}
//       </>
// }

function readibleHex(
  userId: string,
  startLength = 6,
  endLength = 4,
  separator = "..."
) {
  if (!userId.startsWith("0x")) {
    return userId; // Return the original string if it doesn't start with "0x"
  }
  return (
    userId.substring(0, startLength) +
    separator +
    userId.substring(userId.length - endLength)
  );
}

function getProofDataForAuth(
  sismoConnectResponse: SismoConnectResponse,
  authType: AuthType
): string | null {
  for (const proof of sismoConnectResponse.proofs) {
    if (proof.auths) {
      for (const auth of proof.auths) {
        if (auth.authType === authType) {
          return proof.proofData;
        }
      }
    }
  }

  return null; // returns null if no matching authType is found
}

function getProofDataForClaim(
  sismoConnectResponse: SismoConnectResponse,
  claimType: number,
  groupId: string,
  value: number
): string | null {
  for (const proof of sismoConnectResponse.proofs) {
    if (proof.claims) {
      for (const claim of proof.claims) {
        if (
          claim.claimType === claimType &&
          claim.groupId === groupId &&
          claim.value === value
        ) {
          return proof.proofData;
        }
      }
    }
  }

  return null; // returns null if no matching claimType, groupId and value are found
}

export default SismoConnectFunction;
