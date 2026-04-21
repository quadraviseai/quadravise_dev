import {
  AppstoreOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  FilterOutlined,
  LockOutlined,
  RocketOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Empty, Input, Row, Select, Space, Tag, Typography } from "antd";
import { useMemo, useState } from "react";

import SectionHeader from "../components/common/SectionHeader";
import McpAccessModal from "../components/products/McpAccessModal";
import SEOHead from "../components/seo/SEOHead";
import { pageSeo, seoKeywords } from "../constants/seo";
import { mcpCatalog } from "../data/mcpCatalog";

const cardIcons = {
  security: <SafetyCertificateOutlined />,
  automation: <AppstoreOutlined />,
  saas: <RocketOutlined />
};

function McpProductsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedMcp, setSelectedMcp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categoryOptions = useMemo(
    () => ["all", ...new Set(mcpCatalog.map((item) => item.category))].map((value) => ({
      value,
      label: value === "all" ? "All Categories" : value
    })),
    []
  );

  const filteredMcps = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return mcpCatalog.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));
      const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [categoryFilter, searchValue, statusFilter]);

  function openMcpModal(item) {
    setSelectedMcp(item);
    setModalOpen(true);
  }

  return (
    <>
      <SEOHead
        title={pageSeo.mcpProducts.title}
        description={pageSeo.mcpProducts.description}
        keywords={seoKeywords.mcpProducts}
        canonical={pageSeo.mcpProducts.canonical}
      />

      <section className="section mcp-catalog-page-section">
        <div className="section-inner auth-mcp-shell">
          <div className="mcp-catalog-page-hero">
            <div>
              <Typography.Title className="auth-mcp-account-title">Explore Available MCPs</Typography.Title>
              <Typography.Paragraph className="auth-mcp-paragraph mcp-catalog-page-copy">
                Browse the Quadravise MCP catalog, review product summaries, and open access actions directly from a
                focused product dialog.
              </Typography.Paragraph>
            </div>
          </div>

          

          <Card className="mcp-catalog-toolbar-card">
            <div className="mcp-catalog-toolbar">
              <Input
                allowClear
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Search MCPs by name, tag, or description"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <Select
                size="large"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: "all", label: "All Statuses" },
                  { value: "live", label: "Live" },
                  { value: "roadmap", label: "Roadmap" }
                ]}
              />
              <Select size="large" value={categoryFilter} onChange={setCategoryFilter} options={categoryOptions} />
              <div className="mcp-catalog-toolbar-summary">
                <FilterOutlined />
                <span>{filteredMcps.length} MCPs found</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section auth-mcp-section">
        <div className="section-inner auth-mcp-shell">
          <SectionHeader
            title="All Available MCPs"
            subtitle="Each MCP is presented as a reusable product card with quick search, status filtering, and direct access actions."
          />

          {filteredMcps.length ? (
            <Row gutter={[20, 20]}>
              {filteredMcps.map((item) => (
                <Col key={item.key} xs={24} md={12} lg={12}>
                  <Card className="mcp-catalog-card" hoverable onClick={() => openMcpModal(item)}>
                    <div className="mcp-catalog-card-media">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={`${item.title} thumbnail`} className="mcp-catalog-card-thumbnail" />
                      ) : (
                        <span className={`mcp-catalog-card-icon mcp-catalog-card-icon-${item.iconKey}`}>
                          {cardIcons[item.iconKey] || <LockOutlined />}
                        </span>
                      )}
                      <div className="mcp-catalog-card-tags">
                        <Tag
                          className={`mcp-catalog-status-tag mcp-catalog-status-tag-${item.status.toLowerCase()}`}
                          aria-label={item.status}
                        >
                          <ThunderboltOutlined />
                        </Tag>
                        <Tag className="mcp-catalog-category-tag" aria-label={item.category}>
                          <SafetyCertificateOutlined />
                        </Tag>
                      </div>
                    </div>
                    <div className="mcp-catalog-card-content">
                      <Typography.Title level={4}>{item.title}</Typography.Title>
                      <Typography.Paragraph>{item.shortDescription}</Typography.Paragraph>
                      <div className="mcp-catalog-card-chip-row">
                        {item.tags.map((tag) => (
                          <span key={tag}>
                            <CheckCircleFilled />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                      <div className="mcp-catalog-card-footer">
                        {item.actionLinks?.map((action) => (
                          <Button
                            key={action.label}
                            type="text"
                            className="mcp-catalog-card-action"
                            href={action.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <span>{action.label}</span>
                            <ArrowRightOutlined />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Card className="auth-mcp-card">
              <Empty description="No MCP matched your search or filters." />
            </Card>
          )}
        </div>
      </section>

      <McpAccessModal open={modalOpen} onClose={() => setModalOpen(false)} mcp={selectedMcp} initialMode="overview" />
    </>
  );
}

export default McpProductsPage;
