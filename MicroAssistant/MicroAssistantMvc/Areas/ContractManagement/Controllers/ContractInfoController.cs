﻿using MicroAssistant.Cache;
using MicroAssistant.Common;
using MicroAssistant.DataAccess;
using MicroAssistant.DataStructure;
using MicroAssistant.Meta;
using MicroAssistantMvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MicroAssistantMvc.Areas.ContractManagement.Controllers
{
    public class ContractInfoController : MicControllerBase
    {
        //
        // GET: /ContractManagement/ContractInfo/

     


        /// <summary>
        /// 根据企业ID查询合同查询（token）返回 合同列表{合同名称，合同编号，客户，合同金额，合同时间}
        /// </summary>
        /// <param name="eid"></param>
        /// <returns></returns>
        public JsonResult GetContractInfoByEID(string token)
        {
            var Res = new JsonResult();
            AdvancedResult<PageEntity<ContractInfo>> result = new AdvancedResult<PageEntity<ContractInfo>>();
            if (CacheManagerFactory.GetMemoryManager().Contains(token))
            {
                int ownerid = Convert.ToInt32(CacheManagerFactory.GetMemoryManager().Get(token));
                try
                {
                    PageEntity<ContractInfo> list = new PageEntity<ContractInfo>();
                    list = ContractInfoAccessor.Instance.Search(ownerid,0,9999);
                    result.Error = AppError.ERROR_SUCCESS;
                    result.Data = list;

                }
                catch (Exception e)
                {
                    result.Error = AppError.ERROR_FAILED;
                    result.ExMessage = e.ToString();
                }

                result.Error = AppError.ERROR_SUCCESS;
            }
            else
            {
                result.Error = AppError.ERROR_PERSON_NOT_LOGIN;
            }


            Res.Data = result;
            Res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return Res;
        }
        /// <summary>
        /// 添加企业合同(合同编号，合同名称，客户名称，合同有效期1，合同有效期2，合同承办人，合同签订时间，合同金额，付款方式（xml)
        /// </summary>
        /// <param name="contract"></param>
        /// <returns></returns>
        public JsonResult AddContractInfo(String ContractNo, String CName, string CustomerName, DateTime StartTime, DateTime EndTime,
            string token, DateTime ContractTime, double Amount, string HowToPay)
        {
            var Res = new JsonResult();
            RespResult result = new RespResult();
            int _conid = 0;
            if (CacheManagerFactory.GetMemoryManager().Contains(token))
            {
                int ownerid = Convert.ToInt32(CacheManagerFactory.GetMemoryManager().Get(token));
                try
                {
                    ContractInfo co = new ContractInfo();
                    co.OwnerId = Convert.ToInt32(ownerid);
                    co.CName = CName;
                    co.ContractNo = ContractNo;
                    co.CustomerName = CustomerName;
                    co.StartTime = StartTime;
                    co.EndTime = EndTime;
                    co.ContractTime = ContractTime;
                    co.Amount = Amount;

                    //if (entid == 0)
                    //{
                    _conid = ContractInfoAccessor.Instance.Insert(co);
                    //}
                    //else
                    //{
                    //    _entid = entid;

                    //    ce.EntId = _entid;
                    //    ContractInfoAccessor.Instance.Update(ce);
                    //}
                    result.Error = AppError.ERROR_SUCCESS;
                }
                catch (Exception e)
                {
                    result.Error = AppError.ERROR_FAILED;
                    result.ExMessage = e.ToString();
                }
            }
            else
            {
                result.Error = AppError.ERROR_PERSON_NOT_LOGIN;
            }



            Res.Data = result;
            Res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return Res;
        }
        /// <summary>
        /// 上传合同附件（合同编号，file，token）
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public JsonResult UploadContractAttachedFile(object file)
        {
            return null;
        }

        //根据合同编号获取合同信息（合同编号，token）返回（合同名称，合同编号，客户名称，合同金额，付款方式（xml），合同有效期，合同承办人，合同时间，附件{附件url1，附件url2}）
        public JsonResult GetContractInfoByContractNo(string ContractNo, string token)
        {
            var Res = new JsonResult();
            AdvancedResult<ContractInfo> result = new AdvancedResult<ContractInfo>();
            if (CacheManagerFactory.GetMemoryManager().Contains(token))
            {
               // int ownerid = Convert.ToInt32(CacheManagerFactory.GetMemoryManager().Get(token));
                try
                {
                    ContractInfo con = new ContractInfo();
                    con = ContractInfoAccessor.Instance.Get(ContractNo);
                    result.Error = AppError.ERROR_SUCCESS;
                    result.Data = con;

                }
                catch (Exception e)
                {
                    result.Error = AppError.ERROR_FAILED;
                    result.ExMessage = e.ToString();
                }

                result.Error = AppError.ERROR_SUCCESS;
            }
            else
            {
                result.Error = AppError.ERROR_PERSON_NOT_LOGIN;
            }


            Res.Data = result;
            Res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return Res;
        }

    }
}
